import PropTypes from 'prop-types';

const Logo = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Teefon</h1>
    </div>
  );
};

Logo.propTypes = {
  w: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  h: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};


export default Logo;
