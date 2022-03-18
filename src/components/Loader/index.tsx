import React from 'react';
import { Spin } from 'antd';

const Loader: React.FC = () => (
    <div className="loader">
        <Spin />
    </div>
);

export default Loader;