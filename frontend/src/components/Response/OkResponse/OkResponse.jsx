import React from 'react'
import classes from './OkResponse.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout';
import { EXTRA_LONG_DELAY } from '../../../constants';

export default function OkResponse({ message, ...props }) {
    const { navigationBlocks, goNavigation } = useNavigationContext();
    const { toggleHolding } = useLoadingContext();

    if (!message.main) {
        return;
    }

    // обработка возможного закрытия вкладки
    if (message.closeTab) {
        setTimeout(() => {
            window.close();
        }, EXTRA_LONG_DELAY);
    }

    return (
        <div className={classes.OkResponse} {...props}>
            <div>
                {
                    message.main &&
                    <div>
                        <h4>Сообщение:</h4>
                        <p>{message.main}</p>
                    </div>
                }
                {
                    message.addition &&
                    <div>
                        <h4>Дополнительная информация:</h4>
                        <p>{message.addition}</p>
                    </div>
                }
            </div>
            {
                message.holding &&
                <HorizontalLayout>
                    {
                        message.button &&
                        <button
                            type="button"
                            onClick={() => {
                                toggleHolding(false);
                                goNavigation(
                                    navigationBlocks[message.button.key]
                                );
                            }}
                        >
                            {message.button.text}
                        </button>
                    }
                    {
                        !message.closeTab &&
                        <button type="button" onClick={
                            () => toggleHolding(false)
                        }>
                            Вернуться
                        </button>
                    }
                </HorizontalLayout>
            }
        </div>
    )
}
