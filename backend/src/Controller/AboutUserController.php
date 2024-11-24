<?php

namespace App\Controller;

use App\Repository\AboutUserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

class AboutUserController extends AbstractController
{
    #[Route('/another_user/{username}/about', name: 'about_another_user', methods: 'GET')]
    public function aboutAnotherUser(
        string $username,
        SerializerInterface $serializer,
        AboutUserRepository $aboutUserRepository
    ): JsonResponse {
        $aboutUser = $aboutUserRepository->findOneByUsername($username);

        if (!$aboutUser) {
            throw new HttpException(
                UNPROCESSABLE_ENTITY_STATUS_CODE,
                'Не удалось получить данные о другом пользователе'
            );
        }

        // храним картинку в корректном для нормалайзера формате
        $img = $aboutUser->getImage();
        $aboutUser->setImageStr($img);

        return new JsonResponse([
            'aboutUser' => $serializer->normalize(
                $aboutUser,
                'json'
            )
        ]);
    }

    #[Route('/authorized_user/{username}/about', name: 'about_authorized_user', methods: 'GET')]
    public function aboutCurrentUser(
        string $username,
        SerializerInterface $serializer,
        AboutUserRepository $aboutUserRepository
    ): JsonResponse {
        $aboutUser = $aboutUserRepository->findOneByUsername($username);

        if (!$aboutUser) {
            throw new HttpException(
                UNPROCESSABLE_ENTITY_STATUS_CODE,
                'Не удалось получить данные об авторизованном пользователе'
            );
        }

        // храним картинку в корректном для нормалайзера формате
        $img = $aboutUser->getImage();
        $aboutUser->setImageStr($img);

        return new JsonResponse([
            'aboutUser' => $serializer->normalize(
                $aboutUser,
                'json'
            )
        ]);
    }

    #[Route('/authorized_user/{username}/about/update', name: 'update_about_authorized_user', methods: 'POST')]
    public function updateCurrentUser(
        string $username,
        Request $request,
        EntityManagerInterface $entityManager,
        AboutUserRepository $aboutUserRepository
    ): JsonResponse {
        $aboutUser = $aboutUserRepository->findOneByUsername($username);
        $data = json_decode($request->getContent(), true);

        if (!$aboutUser) {
            throw new HttpException(
                UNPROCESSABLE_ENTITY_STATUS_CODE,
                'Не удалось обновить данные о текущем пользователе'
            );
        }

        // обновление и применение данных
        $newName = $data[NAME_TAG];
        if ($newName !== "") {
            $aboutUser->setName($newName);
        }
        $aboutUser->setSecondname($data[SECONDNAME_TAG]);
        $newDateOfBirth = $data[BIRTHDAY_TAG];
        if ($newDateOfBirth !== INVALID_DATE) {
            $aboutUser->setDateOfBirth(date_create($newDateOfBirth));
        }
        $newImage = $data[IMAGE_TAG];
        if ($newImage !== null) {
            $aboutUser->setImage($newImage);
        }
        $entityManager->flush();

        return new JsonResponse([
            'status' => 'Ok',
            'main' => 'Данные успешно сохранены.',
            'holding' => false,
            'delay' => SHORT_DELAY
        ]);
    }
}
