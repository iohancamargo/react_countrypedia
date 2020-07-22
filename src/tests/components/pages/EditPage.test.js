import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditPage from '../../../components/pages/EditPage';

configure({adapter: new Adapter()});

test('should render EditPage correctly', () => {
    const wrapper = shallow(<EditPage />);
	expect(wrapper).toMatchSnapshot();
});