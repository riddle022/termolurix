import { useState } from 'react';
import { InvoiceForm } from './components/InvoiceForm';
import { ProductForm } from './components/ProductForm';
import { WarrantyDocument } from './components/WarrantyDocument';
import { supabase } from './lib/supabase';

interface Product {
  brand: string;
  description: string;
  barcode: string;
  imei_serial: string;
}

type Step = 'invoice' | 'products' | 'document';

function App() {
  const [step, setStep] = useState<Step>('invoice');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [operatorCode, setOperatorCode] = useState('');
  const [operatorName, setOperatorName] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [customerName, setCustomerName] = useState('');

  const handleInvoiceSubmit = (invoice: string, opCode: string, opName: string) => {
    setInvoiceNumber(invoice);
    setOperatorCode(opCode);
    setOperatorName(opName);
    setStep('products');
  };

  const handleGenerateWarranty = async (
    productsList: Product[],
    customer: string
  ) => {
    setProducts(productsList);
    setCustomerName(customer);

    try {
      const { data: warrantyTerm, error: termError } = await supabase
        .from('warranty_terms')
        .insert({
          invoice_number: invoiceNumber,
          operator_code: operatorCode,
          operator_name: operatorName,
          customer_name: customer,
          issue_date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (termError) throw termError;

      if (warrantyTerm) {
        const productsToInsert = productsList.map(product => ({
          warranty_term_id: warrantyTerm.id,
          brand: product.brand,
          description: product.description,
          barcode: product.barcode,
          imei_serial: product.imei_serial
        }));

        const { error: productsError } = await supabase
          .from('warranty_products')
          .insert(productsToInsert);

        if (productsError) throw productsError;
      }
    } catch (error) {
      console.error('Error saving warranty term:', error);
    }

    setStep('document');
  };

  const handleBack = () => {
    setStep('invoice');
    setInvoiceNumber('');
    setOperatorCode('');
    setOperatorName('');
    setProducts([]);
    setCustomerName('');
  };

  return (
    <>
      {step === 'invoice' && <InvoiceForm onSubmit={handleInvoiceSubmit} />}

      {step === 'products' && (
        <ProductForm
          invoiceNumber={invoiceNumber}
          operatorName={operatorName}
          onGenerateWarranty={handleGenerateWarranty}
          onBack={handleBack}
        />
      )}

      {step === 'document' && (
        <WarrantyDocument
          invoiceNumber={invoiceNumber}
          operatorName={operatorName}
          customerName={customerName}
          products={products}
          onBack={handleBack}
        />
      )}
    </>
  );
}

export default App;
