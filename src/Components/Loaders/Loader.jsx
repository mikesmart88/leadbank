import CustomImage from "../Images/CustomImage";

import icon from '../../assets/images/leadbank-icon.png'


export default function Loader() {
    return (
        <section className='loader'>
            <div className="loader-img-circler">
                <CustomImage source={icon} />
            </div>
        </section>
    )
}