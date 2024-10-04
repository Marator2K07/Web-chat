<?php

namespace App\Controller;

use App\Constants\Constants;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{   
    #[Route('/user/all/search', name: 'app_users_get', methods: 'POST')]
    public function search(Request $request, 
                           SerializerInterface $serializer,
                           UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $users = $userRepository
            ->findByNameOrSecondnameField($data['searchLine']);
        // в данном методе в любом случае отправляем массив пользователей (даже пустой)
        return new JsonResponse([
            'users' => 
                $serializer->normalize(
                    $users,
                    'json',
                    ['groups' => ['short']]
                )
        ]);
    } 

    #[Route('/authorized_user/{username}', name: 'app_get_authorized_user', methods: 'GET')]
    public function user(string $username, 
                         SerializerInterface $serializer,
                         UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);
        // пытаемся синхронизировать данные для текущего пользователя
        if (!$user) {
            throw new HttpException(422, 'Не удалось синхронизироваться');
        } else {
            return new JsonResponse([
                'status' => 'Ok',
                'main' => 'Успешная синхронизация.',
                'holding' => false,
                'delay' => Constants::SHORT_DELAY,
                'user' => json_decode(
                    $serializer->serialize(
                        $user,
                        'json',
                        ['groups' => ['user']]
                    ) 
                )
            ]);
        }
    }
}
