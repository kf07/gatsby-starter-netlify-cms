import React from 'react';
import Helmet from 'react-helmet';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import './all.sass';
import Navbar from '../components/Navbar';


const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="備忘録" />
    <Navbar />
    <div>{children}</div>
  </div>
)

export default TemplateWrapper
