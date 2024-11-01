import React from 'react'
import classes from './UserItem.module.css'
import MiniButton from '../../../Helper/MiniButton/MiniButton';
import Spacer from '../../../Helper/Spacer/Spacer';
import { ANOTHER_USER_PAGE_URL } from '../../../../constants';
import { useNavigationContext } from '../../../../contexts/NavigationContext/NavigationProvider';
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';

export default function UserItem({
    user,
    aboutUser,
    button,
    ...props
}) {
    const { navigationBlocks, goNavigationWithAnimation } = useNavigationContext();
    const { user: thisUser } = useUserContext();

    // в случае если пользователь не установил картинку - ставим
    // картинку по умолчанию из файлов проекта
    const userImg = !aboutUser.image
        ? `${window.location.origin}/DefUserIcon.png`
        : aboutUser.image

    // навигация при нажатии на обьект загруженного юзера
    function navigateHandler(username) {
        if (user.username === username) {
            goNavigationWithAnimation(navigationBlocks.personalBlock);
        } else {
            let url = `${ANOTHER_USER_PAGE_URL}/username=${user.username}`;
            window.open(url);
        }
    }

    return (
        <div
            className={classes.UserItem}
            onClick={() => navigateHandler(thisUser.username)}
            {...props}
        >
            <Spacer
                sizeH='1px'
                sizeW='10px'
            />
            <img src={userImg} alt="Not found" />
            <Spacer
                sizeH='1px'
                sizeW='10px'
            />
            <div>
                <p>{aboutUser.name} {aboutUser.secondname}</p>
            </div>
            <Spacer
                sizeH='1px'
                sizeW='10px'
            />
            {
                button &&
                <MiniButton
                    button={button}
                    data={user}
                />
            }
            <Spacer
                sizeH='1px'
                sizeW='10px'
            />
        </div>
    )
}
