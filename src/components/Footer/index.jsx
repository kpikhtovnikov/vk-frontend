import React from 'react';

import css from './index.module.css';

const Footer = () => {
  return (
    <footer>
      <span>Стажировка <span className={css.VK}>VK</span>. Профильное задание на позицию "Фронтенд-разработчик".</span>
    </footer>
  );
}

export default Footer;