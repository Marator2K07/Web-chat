<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UserWithAboutUserController extends AbstractController
{
    #[Route('/user/all/search', name: 'app_users_get', methods: 'POST')]
    public function search(Request $request, 
                           SerializerInterface $serializer,
                           UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $users = $userRepository
            ->findByNameOrSecondnameField($data['searchStr']);
            
        $infos = [];
        foreach ($users as &$user) {
            $item = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'aboutUser' => $user->getAboutUser()
            ];
            $infos[] = $item;
        }

        return new JsonResponse([
            'users' => json_decode(
                $serializer->serialize($infos, 'json')
            )
        ]);
    }

    #[Route('/user/get/{username}', name: 'app_user_get', methods: 'GET')]
    public function anotherUser(string $username, 
                                SerializerInterface $serializer,
                                UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);

        if (!$user) {
            throw new HttpException(422, 'Не удалось обновить данные');
        } else {
            return new JsonResponse([
                'status' => 'Ok',                
                'main' => 'Пользователь загружен.',
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