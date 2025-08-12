(function(){
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const panelLogin = document.getElementById('panel-login');
  const panelSignup = document.getElementById('panel-signup');

  function activate(tab){
    const isLogin = tab === 'login';
    tabLogin.classList.toggle('active', isLogin);
    tabSignup.classList.toggle('active', !isLogin);
    tabLogin.setAttribute('aria-selected', String(isLogin));
    tabSignup.setAttribute('aria-selected', String(!isLogin));
    panelLogin.classList.toggle('hidden', !isLogin);
    panelSignup.classList.toggle('hidden', isLogin);
    (isLogin ? panelLogin : panelSignup).querySelector('input')?.focus();
  }

  tabLogin?.addEventListener('click', () => activate('login'));
  tabSignup?.addEventListener('click', () => activate('signup'));

  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const signupForm = document.getElementById('signupForm');
  const signupError = document.getElementById('signupError');

  function validateLogin(){
    const fd = new FormData(loginForm);
    const userid = String(fd.get('userid') || '').trim();
    const password = String(fd.get('password') || '').trim();

    if (!userid) return 'User ID is required';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  }

  function validateSignup(){
    const fd = new FormData(signupForm);
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '').trim();
    const confirm = String(fd.get('confirm') || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirm) return 'Passwords do not match';
    return '';
  }

  function redirectToMaintenance(){
    window.location.href = '/maintenance.html';
  }

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = validateLogin();
    if (msg) {
      loginError.textContent = msg;
      return;
    }
    loginError.textContent = '';
    redirectToMaintenance();
  });

  signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = validateSignup();
    if (msg) {
      signupError.textContent = msg;
      return;
    }
    signupError.textContent = '';
    redirectToMaintenance();
  });
})();