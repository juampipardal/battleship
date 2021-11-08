import { configure, render, screen } from '@testing-library/react';
import { Cell } from './cell';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


Enzyme.configure({ adapter: new Adapter() });

describe('<Cell>', () => {
    it('Render with green background when hasShip is true', () => {
        const wrapper = shallow(<Cell
            hasShip={true}
            isHitted={false}
            isDestroyed={false}
            isEmptyClicked={false}
            cpuBattlefield={false}
            click={() => {}}
            YIndex={0}
            XIndex={0}  
        />);
    
      expect(wrapper.find('div').hasClass('-green-background')).toEqual(true);
    });
    it('Render with red background when isDestroyed is true', () => {
        const wrapper = shallow(<Cell
            hasShip={false}
            isHitted={false}
            isDestroyed={true}
            isEmptyClicked={false}
            cpuBattlefield={false}
            click={() => {}}
            YIndex={0}
            XIndex={0}  
        />);
    
      expect(wrapper.find('div').hasClass('-red-background')).toEqual(true);
    });
    it('Render with orange background when isHitted is true', () => {
        const wrapper = shallow(<Cell
            hasShip={false}
            isHitted={true}
            isDestroyed={false}
            isEmptyClicked={false}
            cpuBattlefield={false}
            click={() => {}}
            YIndex={0}
            XIndex={0}  
        />);
    
      expect(wrapper.find('div').hasClass('-orange-background')).toEqual(true);
    });

    it('Render with light-blue background when isEmptyClicked is true', () => {
        const wrapper = shallow(<Cell
            hasShip={false}
            isHitted={false}
            isDestroyed={false}
            isEmptyClicked={true}
            cpuBattlefield={false}
            click={() => {}}
            YIndex={0}
            XIndex={0}  
        />);
    
      expect(wrapper.find('div').hasClass('-light-blue-background')).toEqual(true);
    });

    it('Render without background when cpuBattlefield is true', () => {
        const wrapper = shallow(<Cell
            hasShip={false}
            isHitted={false}
            isDestroyed={false}
            isEmptyClicked={false}
            cpuBattlefield={true}
            click={() => {}}
            YIndex={0}
            XIndex={0}  
        />);
    
      expect(wrapper.find('div').hasClass('-green-background')).toEqual(false);
    });

});

