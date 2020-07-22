import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailPage from '../../../components/pages/DetailPage';

configure({adapter: new Adapter()});

test('should render DetailPage correctly', () => {
    const wrapper = shallow(<DetailPage />);
	expect(wrapper).toMatchSnapshot();
});