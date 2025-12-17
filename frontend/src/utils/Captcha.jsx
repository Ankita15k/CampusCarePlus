import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({ onVerify }) => {
  return (
    <div className="flex justify-center">
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={onVerify}
        onExpired={() => onVerify(null)}
      />
    </div>
  );
};

export default Captcha;
