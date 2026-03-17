import { useRef } from 'react';
import { Printer, Download, Home, FileText } from 'lucide-react';

interface Product {
  brand: string;
  description: string;
  barcode: string;
  imei_serial: string;
}

interface WarrantyDocumentProps {
  invoiceNumber: string;
  operatorName: string;
  customerName: string;
  products: Product[];
  onBack: () => void;
}

export function WarrantyDocument({
  invoiceNumber,
  operatorName,
  customerName,
  products,
  onBack
}: WarrantyDocumentProps) {
  const documentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="min-h-screen bg-black selection:bg-white selection:text-black">
      {/* Decorative background elements */}
      <div className="print:hidden fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-zinc-800/20 rounded-full blur-[100px]" />
      </div>

      <div className="print:hidden glass-card !bg-zinc-900/60 !backdrop-blur-xl border-t-0 border-x-0 rounded-none sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-lg shadow-white/10">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white uppercase tracking-tight">Documento Oficial</h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mt-1">Status: <span className="text-emerald-500">Pronto para Impressão</span></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition text-[10px] font-bold uppercase tracking-widest border border-white/5"
            >
              <Home className="w-3 h-3" />
              Início
            </button>
            <button
              onClick={handlePrint}
              className="group flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-zinc-100 text-black rounded-xl transition text-[10px] font-black uppercase tracking-widest shadow-xl shadow-white/10 active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir Agora
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition text-[10px] font-bold uppercase tracking-widest border border-white/5"
            >
              <Download className="w-3 h-3" />
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-8 md:p-12 print:p-0 relative">
        <div ref={documentRef} className="bg-white text-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] print:shadow-none p-16 print:px-10 print:pt-2 print:pb-10 rounded-[2px] print:rounded-none relative overflow-hidden">
          {/* Subtle watermark in preview */}
          <div className="print:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-zinc-100/50 -rotate-[30deg] pointer-events-none uppercase tracking-[0.5em] select-none">
            Original
          </div>
          <div className="text-center mb-4">
            <div className="text-black font-black tracking-widest text-xl mb-1">LURYX DUTY FREE</div>
            <h1 className="text-2xl font-bold text-black mb-2 uppercase">Termo de Garantia</h1>
          </div>

          <div className="space-y-3 text-[13px] leading-snug">
            <p className="text-justify">
              A <strong>LURYX DUTY FREE</strong> inscrita no CNPJ nº: <strong>21.977.171/0001-45</strong> assegura ao cliente abaixo identificado uma garantia de <strong>90 (noventa) dias</strong> sobre o objeto descrito, contada a partir da data de emissão deste certificado.
            </p>

            <div className="border-l-4 border-black pl-4 space-y-2 text-[12px]">
              <p>• A GARANTIA DE 90 (NOVENTA) dias está de acordo com o artigo 26 inciso II do Código de Defesa do Consumidor;</p>
              <p>• Funcionamento, instalação e atualização de aplicativos, bem como o sistema operacional do aparelho NÃO FAZEM parte desta garantia;</p>
              <p>• Limpeza e conservação do aparelho NÃO FAZEM parte desta garantia;</p>
              <p>• A não apresentação de documento (nota fiscal ou este termo) que comprove o serviço INVALIDA a garantia;</p>
              <p>• Qualquer mal funcionamento APÓS ATUALIZAÇÕES do sistema operacional ou aplicativos NÃO FAZEM PARTE DESTA GARANTIA;</p>
              <p>• A GARANTIA é válida somente para o item descrito na Nota Fiscal, ordem de serviço ou neste termo de garantia, NÃO ABRANGENDO OUTRAS PARTES e respeitando as condições aqui descritas;</p>
              <p>• Somente o TITULAR DA COMPRA poderá solicitar a garantia do produto;</p>
              <p>• A LURYX DUTY FREE, de acordo com o artigo 18 do Código de Defesa do Consumidor, tem assegurado um prazo de 30 dias corridos para realizar a assistência técnica;</p>
              <p>• Para acionar a garantia de um produto adquirido na LURYX DUTY FREE, o titular da compra deve comparecer à loja onde a compra foi realizada dentro do prazo estipulado para cada caso apresentando o produto (incluindo embalagem, acessórios originais), documento com foto, nota fiscal da compra sem rasuras e/ou modificações e termo de garantia;</p>
              <p>• Atenção: a LURYX DUTY FREE NÃO realiza troca de cortesia, assegurando aos seus clientes o direito de acionar a garantia de acordo com os termos que constam neste documento.</p>
            </div>

            <div className="border-2 border-black p-3 rounded">
              <h2 className="font-bold text-black mb-2 underline text-sm">A GARANTIA É CANCELADA AUTOMATICAMENTE NOS SEGUINTES CASOS:</h2>
              <p className="text-justify text-black text-[11px] leading-tight">
                Em ocasiões de quedas, esmagamentos, sobrecarga elétrica; exposição do aparelho a altas temperaturas, umidade ou líquidos, exposição do aparelho a poeira, pó e/ou limalha de metais, ou ainda quando constatado mau uso do aparelho, instalações, modificações ou atualizações no seu sistema operacional, abertura do equipamento ou tentativa de conserto deste por terceiros mesmo que para realização de outros serviços. Além de lente touchscreen que apresente mau uso, trincados ou quebrados, riscados, manchados, descolados ou com cabo flex rompido.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-4 print:p-2 rounded-lg space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-semibold">Data:</span> {currentDate}
                </div>
                <div>
                  <span className="font-semibold">Nota Fiscal:</span> {invoiceNumber}
                </div>
              </div>

              {products.map((product, index) => (
                <div key={index} className="border-t border-neutral-300 pt-2 space-y-1">
                  <div className="grid grid-cols-2 gap-2 text-[12px]">
                    <div>
                      <span className="font-semibold">Marca:</span> {product.brand}
                    </div>
                    <div>
                      <span className="font-semibold">Modelo:</span> {product.description}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600">
                    {product.imei_serial && (
                      <div>
                        <span className="font-semibold">IMEI/Série:</span> {product.imei_serial}
                      </div>
                    )}
                    {product.barcode && (
                      <div>
                        <span className="font-semibold">Barcode:</span> {product.barcode}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center py-2">
              <p className="font-semibold mb-4">Li e concordo com o TERMO DE GARANTIA aplicado na LURYX DUTY FREE.</p>

              <div className="space-y-4">
                <div>
                  <div className="border-t-2 border-black w-80 mx-auto mb-1"></div>
                  <p className="font-semibold">{customerName || '_______________________________________________'}</p>
                  <p className="text-xs text-neutral-600">Assinatura do Cliente</p>
                </div>

                <div className="text-right">
                  <p className="text-[11px]">Emitido por: <strong>{operatorName}</strong></p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-300 text-center text-[10px] text-neutral-600 space-y-0.5">
            <p>Para mais informações sobre a nossa política de garantia entre em contato conosco</p>
            <p className="font-semibold">LURYX DUTY FREE - CNPJ: 21.977.171/0001-45</p>
          </div>
        </div>
      </div>
    </div>
  );
}
