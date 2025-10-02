export default function Slider(){
  return (
    <div id="carousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="2"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600" className="d-block w-100" alt="code"/>
          <div className="carousel-caption d-none d-md-block"><h5>Desarrollo Web</h5></div>
        </div>
        <div className="carousel-item">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600" className="d-block w-100" alt="team"/>
          <div className="carousel-caption d-none d-md-block"><h5>Arquitecturas y Concurrencia</h5></div>
        </div>
        <div className="carousel-item">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600" className="d-block w-100" alt="security"/>
          <div className="carousel-caption d-none d-md-block"><h5>Ciberseguridad</h5></div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  )
}