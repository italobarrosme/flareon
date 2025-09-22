import { BoxData } from '@/modules/games/boxGame/type'

type GameInfoUIProps = {
  gameData: BoxData
  onClose: () => void
}

export const GameInfoUI = ({ gameData, onClose }: GameInfoUIProps) => {
  return (
    <div className="w-full h-full p-6 gap-4 text-game-info-text-primary font-sans bg-game-info-bg-primary rounded-lg border-2 border-game-info-bg-secondary flex flex-col gap-spacing-game-info-gap box-border animate-fade-in">
      {/* Botão de fechar */}
      <CloseButton onClick={onClose} />

      {/* Título do jogo */}
      <GameTitle title={gameData.title} />

      {/* Thumbnail do jogo */}
      <GameThumbnail src={gameData.thumbnail} alt={gameData.title} />

      {/* Informações do jogo */}
      <GameDetails gameData={gameData} />

      {/* Descrição */}
      <GameDescription description={gameData.short_description} />

      {/* Botão para jogar */}
      <PlayButton url={gameData.game_url} />
    </div>
  )
}

// Componentes menores e reutilizáveis
const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-2.5 right-2.5 bg-game-info-btn-danger hover:bg-game-info-btn-danger-hover text-white border-none rounded-full w-7 h-7 cursor-pointer text-sm font-bold transition-colors duration-200 flex items-center justify-center"
  >
    ✕
  </button>
)

const GameTitle = ({ title }: { title: string }) => (
  <h3 className="mr-5 text-lg font-bold text-game-info-text-title animate-game-slide-up">
    {title}
  </h3>
)

const GameThumbnail = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-full h-52 overflow-hidden rounded-md border border-game-info-border-primary">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
    />
  </div>
)

const GameDetails = ({ gameData }: { gameData: BoxData }) => (
  <div className="flex flex-col gap-2 text-xs">
    <DetailItem label="Gênero" value={gameData.genre} />
    <DetailItem label="Plataforma" value={gameData.platform} />
    <DetailItem label="Desenvolvedor" value={gameData.developer} />
    <DetailItem label="Publicadora" value={gameData.publisher} />
    <DetailItem label="Lançamento" value={gameData.release_date} />
  </div>
)

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="transition-colors duration-200 hover:text-game-info-text-accent">
    <strong className="text-game-info-text-accent">{label}:</strong>{' '}
    <span className="text-game-info-text-primary">{value}</span>
  </div>
)

const GameDescription = ({ description }: { description: string }) => (
  <div className="flex-1 text-xs min-h-20 leading-relaxed overflow-auto p-2 bg-game-info-bg-accent rounded border border-game-info-border-secondary">
    <strong className="text-game-info-text-accent">Descrição:</strong>
    <p className="mt-1 text-game-info-text-secondary">{description}</p>
  </div>
)

const PlayButton = ({ url }: { url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-center py-3 px-4 bg-game-info-btn-primary hover:bg-game-info-btn-primary-hover text-white no-underline rounded-md text-sm font-bold transition-all duration-200 border-2 border-transparent hover:border-game-info-border-primary hover:-translate-y-0.5"
  >
    🎮 Conhecer Mais
  </a>
)
