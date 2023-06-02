import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formSubmit: document.querySelector('.form'),
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
  
};

refs.formSubmit.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function handleSubmit(event) {
  event.preventDefault();
  let amount = parseInt(refs.amountEl.value);
  let delay = parseInt(refs.delayEl.value);
  let step = parseInt(refs.stepEl.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    createPromise(position, delay).then(({position, delay}) => {
      Notify.success(`Promise ${position} resolved with delay ${delay}`);
    }).catch(({position, delay}) => {
      Notify.failure(`Promise ${position} rejected with delay ${delay}`);
    });
    delay += step;
  }
}
