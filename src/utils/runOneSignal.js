import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.init({ appId: '54a01f93-b460-49e6-8813-8428b4ef42ab', allowLocalhostAsSecureOrigin: true});
  OneSignal.showSlidedownPrompt();
}