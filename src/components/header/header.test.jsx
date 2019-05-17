import React from 'react'
import { shallow } from 'enzyme'
import Header from './index.tsx'

describe('Component: Header', () => {
    let header

    beforeAll(() => {
        header = shallow(<Header />)
    })

    describe('render', () => {
        test('component builds', () => {
            expect(header).not.toBe(undefined)
        })

        test('Navbar element exists', () => {
            expect(header.find('Navbar').length).toBe(1)
        })

        test('navbar brand exists', () => {
            expect(header.find('NavbarBrand').length).toBe(1)
        })

    })
});
