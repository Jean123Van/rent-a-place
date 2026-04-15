import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { COLORS } from '../styles/colors';

export const Home = () => {
    const mockAvailableCarData = [
        {
            id: 1,
            owner: 'Jambani',
            unitName: 'Wigo',
            image: 'https://toyotasantarosa.com.ph/wp-content/uploads/2023/07/0000_WIGO_G-CVT-Colorswatch-Grey.jpg',
        },
        {
            id: 1,
            owner: 'Jambani',
            unitName: 'Wigo',
            image: 'https://toyotasantarosa.com.ph/wp-content/uploads/2023/07/0000_WIGO_G-CVT-Colorswatch-Grey.jpg',
        },
        {
            id: 1,
            owner: 'Jambani',
            unitName: 'Wigo',
            image: 'https://toyotasantarosa.com.ph/wp-content/uploads/2023/07/0000_WIGO_G-CVT-Colorswatch-Grey.jpg',
        },
        {
            id: 1,
            owner: 'Jambani',
            unitName: 'Wigo',
            image: 'https://toyotasantarosa.com.ph/wp-content/uploads/2023/07/0000_WIGO_G-CVT-Colorswatch-Grey.jpg',
        },
        {
            id: 1,
            owner: 'Jambani',
            unitName: 'Wigo',
            image: 'https://toyotasantarosa.com.ph/wp-content/uploads/2023/07/0000_WIGO_G-CVT-Colorswatch-Grey.jpg',
        },
        {
            id: 1,
            owner: 'Jambani',
            unitName: 'Wigo',
            image: 'https://toyotasantarosa.com.ph/wp-content/uploads/2023/07/0000_WIGO_G-CVT-Colorswatch-Grey.jpg',
        },
        {
            id: 1,
            owner: 'Jambani',
            unitName: 'Wigo',
            image: 'https://toyotasantarosa.com.ph/wp-content/uploads/2023/07/0000_WIGO_G-CVT-Colorswatch-Grey.jpg',
        },
    ];

    const navigate = useNavigate();

    return (
        <div>
            <div
                style={{
                    padding: '10px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '15px',
                }}
            >
                {mockAvailableCarData.map((option) => (
                    <ShadowedContainer
                        style={{
                            height: '200px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                        }}
                    >
                        <div
                            style={{
                                border: `2px solid ${COLORS.skintone}`,
                                width: '50%',
                                alignItems: 'center',
                                justifyItems: 'center',
                                display: 'flex',
                                borderRadius: '5px',
                            }}
                        >
                            <img
                                src={option.image}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    alignSelf: 'center',
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '50%',
                            }}
                        >
                            <p>Owner: {option.owner}</p>
                            <p>Unit: {option.unitName}</p>
                            <PrimaryButton
                                onClick={() => {
                                    navigate(`/book/${option.id}`);
                                }}
                            >
                                Book now!
                            </PrimaryButton>
                        </div>
                    </ShadowedContainer>
                ))}
            </div>
        </div>
    );
};
