import emailjs from '@emailjs/browser';

const sendSketchToEmail = (to_email, to_name, message) => {
  var templateParams = {
    to_email,
    to_name,
    message,
  };
  
  emailjs.init('ziwCSKGvh1ofSOPXV');

  emailjs.send('service_k0k6e56', 'template_npqitqg', templateParams).then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
    },
    function (error) {
      console.log('FAILED...', error);
    },
  );
};

export { sendSketchToEmail };
