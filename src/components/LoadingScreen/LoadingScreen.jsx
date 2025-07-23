import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-cat">
    <div className="body"></div>
    <div className="head">
        <div className="face"></div>
    </div>
    <div className="foot">
        <div className="tummy-end">
        </div>
        <div className="bottom">
        </div>
        <div className="legs left">
        </div>
        <div className="legs right">
        </div>
    </div>
    <div className="hands left">
    </div>
    <div className="hands right">
    </div>
</div>

      <p className="loading-text">Cargando productos...</p>
    </div>
  );
};

export default LoadingScreen;
