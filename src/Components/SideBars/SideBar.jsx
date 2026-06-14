import React, {useState} from 'react';
import { Link } from 'react-router';
import CustomImage from '../Images/CustomImage';
import CustomButton from '../Buttons/CustomButtons';
import Icon from '../Icons/Icon';

import icon from '../../assets/images/picko-icon.png';

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns 
 */

export default function SideBar({style, ...props}) {
    return (
        <aside style={style} {...props}>
            <div className='main-side'>
                <CustomImage className="img" source={icon} altText="picko icon" />
            <div>
                <Link>
                <Icon name="MdDashboard" />
                </Link>
                <Link>
                <Icon name="MdAddTask" />
                </Link>
                <Link>
                <Icon name="MdStorefront" />
                </Link>
                <Link>
                <Icon name="IoWalletOutline" />
                </Link>
                <Link>
                <Icon name="IoPerson" />
                </Link>
            </div>
            </div>
        </aside>
    )
}