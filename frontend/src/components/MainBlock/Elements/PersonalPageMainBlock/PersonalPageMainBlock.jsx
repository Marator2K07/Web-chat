import React, { useState } from 'react'
import classes from './PersonalPageMainBlock.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';

export default function PersonalPageMainBlock({...props}) {
	const { aboutUser } = useUserContext();
	const [canBeChanged, setCanBeChanged] = useState(true);
	const [selectedImage, setSelectedImage] = useState(null); 

	return (	
		<div className={classes.PersonalPageMainBlock} {...props}>
			{
				canBeChanged ? 
				<div className="">
					<h4>Фото аккаунта:</h4>
					{
						!selectedImage &&
						<img src={`${window.location.origin}/DefUserIcon.png`} alt="" />
					}					
					{ 
						selectedImage && 
						<img 
							src={URL.createObjectURL(selectedImage)}
							alt="Not found" />
					}					
					<h4>Имя:</h4>
					<p>{aboutUser.name}</p>
					<h4>Фамилия:</h4>
					<p>{aboutUser.secondname ? aboutUser.secondname : 'Не задано'}</p>
					<h4>День рождения:</h4>
					<p>{aboutUser.dateOfBirth ? aboutUser.dateOfBirth : 'Не задано'}</p>
				</div>				
				: 				
				<form name='updateAboutUserForm'>
                	
            	</form>
			}
			
			<button type="button" onClick={
				() => setCanBeChanged(!canBeChanged)
			}> { !canBeChanged ? 'Сохранить изменения' : 'Изменить данные'}</button>		
		</div>
	)              
}
