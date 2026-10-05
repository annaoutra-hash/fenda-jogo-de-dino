import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-md bg-[#121612] border border-[#4a8270] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="bg-[#182017] p-4 flex justify-between items-center border-b border-[#2c3826]">
              <h2 className="text-lg font-bold text-[#e0d8c3] tracking-wide">Manual de Sobrevivência</h2>
              <button
                onClick={onClose}
                className="text-[#857f70] hover:text-[#e0d8c3] transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Scroll */}
            <div className="p-5 overflow-y-auto space-y-5 text-sm text-[#c5bfae]">
              <section>
                <h3 className="text-[#a4c794] font-bold mb-1">🦖 O Mundo</h3>
                <p>
                  Você caiu na <strong className="text-[#e0d8c3]">Fenda Cretácea</strong>. O objetivo é sobreviver, coletar sucata tecnológica, comida e desvendar o segredo da fenda para voltar ao século XXI.
                </p>
              </section>

              <section>
                <h3 className="text-[#a4c794] font-bold mb-1">🏕️ O Acampamento</h3>
                <p>
                  Sua base segura. Aqui você gasta <strong className="text-[#e0d8c3]">Sucata</strong> para construir melhorias e usa a <strong className="text-[#e0d8c3]">Bancada</strong> para fabricar itens usando seus recursos. Instalações avançadas destravam mecânicas e até finais de jogo.
                </p>
              </section>

              <section>
                <h3 className="text-[#a4c794] font-bold mb-1">🗺️ Expedições</h3>
                <p>
                  Para explorar, você manda um sobrevivente (Batedor) com uma mochila de itens. Nas cartas, arraste para as direções indicadas para tomar decisões. A chance de sucesso é baseada no atributo testado + bônus do seu batedor + equipamentos da mochila.
                </p>
              </section>

              <section>
                <h3 className="text-[#a4c794] font-bold mb-1">🎒 Itens "Certeiros"</h3>
                <p>
                  Opções marcadas como <strong className="text-[#e0d8c3]">Certeiro</strong> e com o ícone de <strong className="text-[#a4c794]">brilho</strong> exigem um item específico da sua mochila. Elas garantem 100% de sucesso sem rolar os dados, mas consumirão um uso desse item!
                </p>
              </section>

              <section>
                <h3 className="text-[#a4c794] font-bold mb-1">⚔️ Combate Real</h3>
                <p>
                  Algumas cartas (ou a escolha explícita de "Lutar") iniciam o combate em turnos. Nele, você ataca ou tenta fugir num teste contra o D100. Cuidado: predadores maiores causam muito dano, mas dão ótimos recursos se abatidos.
                </p>
              </section>

              <section>
                <h3 className="text-[#a4c794] font-bold mb-1">☠️ Fuga e Morte</h3>
                <p>
                  Você pode escolher "Abortar" entre uma carta e outra. Ao fazer isso, perderá um item aleatório ou metade dos recursos, mas voltará vivo com o resto. Se a vida do seu batedor chegar a zero, ele morre e TODOS os itens levados ficam perdidos na selva.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#182017] border-t border-[#2c3826]">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#4a8270] text-[#121612] font-bold rounded-lg hover:brightness-110"
              >
                Entendi, voltar ao jogo!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
