import '../../styles/NotFound.css';
import oops from '../../assets/404.png';

function NotFound() {
  return (
    <div className="not-found-container">
        <img
              src={oops}
              alt="NotFound"
              className="responsive-logo"
            />
    </div>
  );
}

export default NotFound;
