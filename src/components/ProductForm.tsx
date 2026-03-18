import { useState } from 'react';
import { Plus, Trash2, FileText, Barcode } from 'lucide-react';

interface Product {
  brand: string;
  description: string;
  barcode: string;
  imei_serial: string;
}

interface ProductFormProps {
  invoiceNumber: string;
  operatorName: string;
  onGenerateWarranty: (products: Product[], customerName: string) => void;
  onBack: () => void;
}

export function ProductForm({ invoiceNumber, operatorName, onGenerateWarranty, onBack }: ProductFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    brand: '',
    description: '',
    barcode: '',
    imei_serial: ''
  });
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');

  const addProduct = () => {
    setError('');

    if (!currentProduct.brand.trim() || !currentProduct.description.trim()) {
      setError('Por favor, preencha marca e descrição do produto');
      return;
    }

    setProducts([...products, currentProduct]);
    setCurrentProduct({
      brand: '',
      description: '',
      barcode: '',
      imei_serial: ''
    });
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    if (products.length === 0) {
      setError('Adicione pelo menos um produto');
      return;
    }

    onGenerateWarranty(products, customerName);
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 selection:bg-white selection:text-black">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-zinc-800/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative px-4">
        <div className="glass-card rounded-[2.5rem] overflow-hidden">
          <div className="bg-gradient-to-b from-white/5 to-transparent px-8 py-10 border-b border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter">Itens do Termo</h1>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold mt-1">
                    Nota: <span className="text-zinc-200">{invoiceNumber}</span> • Op: <span className="text-zinc-200">{operatorName}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Novo Item
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-white uppercase tracking-[0.15em] pl-1 mb-2 block">Marca</label>
                  <input
                    type="text"
                    value={currentProduct.brand}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                    className="w-full px-5 py-4 bg-black/40 rounded-xl border border-white/5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/10 transition-all font-medium"
                    placeholder="Ex: Apple, Samsung..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-white uppercase tracking-[0.15em] pl-1 mb-2 block">Descrição / Modelo</label>
                  <input
                    type="text"
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                    className="w-full px-5 py-4 bg-black/40 rounded-xl border border-white/5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/10 transition-all font-medium"
                    placeholder="Ex: iPhone 15 Pro Max"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-white uppercase tracking-[0.15em] pl-1 mb-2 flex items-center gap-2">
                    <Barcode className="w-3.5 h-3.5" /> Código de Barras
                  </label>
                  <input
                    type="text"
                    value={currentProduct.barcode}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, barcode: e.target.value })}
                    className="w-full px-5 py-4 bg-black/40 rounded-xl border border-white/5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/10 transition-all font-mono"
                    placeholder="789..."
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-white uppercase tracking-[0.15em] pl-1 mb-2 block">IMEI / Número de Série</label>
                  <input
                    type="text"
                    value={currentProduct.imei_serial}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, imei_serial: e.target.value })}
                    className="w-full px-5 py-4 bg-black/40 rounded-xl border border-white/5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/10 transition-all font-mono"
                    placeholder="SN/IMEI"
                  />
                </div>
              </div>

              <button
                onClick={addProduct}
                className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.1em] text-xs shadow-lg shadow-white/5 group"
              >
                <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                Registrar no Termo
              </button>
            </div>

            {products.length > 0 && (
              <div className="space-y-5">
                <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                  Itens na Lista <span className="text-zinc-600">({products.length})</span>
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {products.map((product, index) => (
                    <div key={index} className="group bg-black/40 border border-white/5 rounded-2xl p-5 flex items-start justify-between hover:border-white/20 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 bg-white text-black font-black rounded uppercase">{product.brand}</span>
                          <p className="font-bold text-white text-sm tracking-tight">{product.description}</p>
                        </div>
                        <div className="flex gap-4">
                          {product.barcode && <p className="text-[9px] text-zinc-500 font-mono">BC: {product.barcode}</p>}
                          {product.imei_serial && <p className="text-[9px] text-zinc-500 font-mono">SN: {product.imei_serial}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => removeProduct(index)}
                        className="text-zinc-600 hover:text-red-500 p-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-8 pt-10 border-t border-white/5">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">Dados Complementares</h2>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-white uppercase tracking-[0.15em] pl-1 mb-2 block">Nome do Cliente</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-5 py-4 bg-black/40 rounded-xl border border-white/5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/10 transition-all font-medium"
                    placeholder="NOME COMPLETO"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center animate-shake">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBack}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-5 rounded-2xl transition-all uppercase tracking-[0.1em] text-xs border border-white/5"
              >
                Cancelar
              </button>
              <button
                onClick={handleGenerate}
                className="flex-[2] bg-white hover:bg-zinc-100 text-black font-bold py-5 rounded-2xl transition-all uppercase tracking-[0.1em] text-xs shadow-[0_20px_40px_-15px_rgba(255,255,255,0.2)]"
              >
                Gerar Documento Oficial
              </button>
            </div>
          </div>
        </div>

        <div className="py-12 text-center opacity-30 select-none">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.5em]">Luryx Duty Free Technology</p>
        </div>
      </div>
    </div>
  );
}
