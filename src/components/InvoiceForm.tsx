import { useState } from 'react';

interface InvoiceFormProps {
  onSubmit: (invoiceNumber: string, operatorCode: string, operatorName: string) => void;
}

export function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [operatorCode, setOperatorCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!invoiceNumber.trim() || !operatorCode.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const { supabase } = await import('../lib/supabase');
      const { data: operator, error: opError } = await supabase
        .from('operators')
        .select('name')
        .eq('code', operatorCode)
        .eq('active', true)
        .maybeSingle();

      if (opError) throw opError;

      if (!operator) {
        setError('Código de operador não encontrado');
        setLoading(false);
        return;
      }

      onSubmit(invoiceNumber, operatorCode, operator.name);
    } catch (err) {
      setError('Erro ao validar operador');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-white selection:text-black">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-zinc-800/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-xl relative">
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-b from-white/5 to-transparent px-8 py-10 border-b border-white/5 text-center">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-3 uppercase">Termo Garantia</h1>
            <p className="text-white font-bold tracking-[0.4em] text-sm uppercase">Luryx Duty Free</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-6">
              <div className="group">
                <label htmlFor="invoice" className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-white">
                  Número da Nota Fiscal
                </label>
                <input
                  id="invoice"
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-5 py-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all"
                  placeholder="000.000.000"
                  disabled={loading}
                />
              </div>

              <div className="group">
                <label htmlFor="operator" className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-white">
                  Código do Operador
                </label>
                <input
                  id="operator"
                  type="text"
                  value={operatorCode}
                  onChange={(e) => setOperatorCode(e.target.value)}
                  className="w-full px-5 py-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all font-mono tracking-wider"
                  placeholder="EX: 12345"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-4 rounded-xl text-sm font-medium flex items-center justify-center animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-center px-8 py-5 bg-white hover:bg-zinc-100 text-black font-black rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-xs shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.4)] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Validando...
                </span>
              ) : (
                'Identificar Acesso'
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em]">
            Luryx Duty Free — CNPJ: 21.977.171/0001-45
          </p>
        </div>
      </div>
    </div>
  );
}
