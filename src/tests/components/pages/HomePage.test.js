import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from '../../../components/pages/HomePage';



configure({adapter: new Adapter()});

test('should render HomePage correctly', () => {
    const wrapper = shallow(<HomePage />);
	expect(wrapper).toMatchSnapshot();
});