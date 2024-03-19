<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class AuthorizedUserController extends AbstractController
{
    #[Route('/authorized_user/{username}', name: 'app_authorized_user', methods: 'GET')]
    public function identity(string $username,
                             SerializerInterface $serializer,
                             UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);

        if (!$user) {
            throw new HttpException(409, 'Не удалось получить данные');
        } else {            
            return new JsonResponse([
                'status' => 'Ok',                
                'main' => 'Успешная синхронизация.',
                'holding' => false,
                'user' => [
                    'id' => $user->getId(),
                    'username' => $user->getUsername(),
                    'roles' => $user->getRoles()
                ],
                'aboutUser' => json_decode(
                    $serializer->serialize(
                    $user->getAboutUser(), 'json'
                ))
            ]);
        }
    }
}
