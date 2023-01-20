import emailjs from '@emailjs/browser';

const sendSketchToEmail = (
  to_email: string,
  to_name: string,
  message: string,
) => {
  var templateParams = {
    to_email,
    to_name,
    message,
  };

  emailjs.init('ziwCSKGvh1ofSOPXV');

  emailjs.send('service_k0k6e56', 'template_c4qjhx8', templateParams).then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
      location.reload();
    },
    function (error) {
      console.log('FAILED...', error);
    },
  );
};

export { sendSketchToEmail };
