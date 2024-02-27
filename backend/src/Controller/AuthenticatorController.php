<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AuthenticatorController extends AbstractController
{
    #[Route(path: '/signin', name: 'app_sign_in')]
    public function appSignIn(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        if ($this->getUser()) {
            return new JsonResponse(['status' => 'Ok',
                'message' => 'Вход в аккаунт выполнен успешно']);
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return new JsonResponse(['status' => 'Bad',
            'last_username' => $lastUsername,
            'error' => $error]);
    }

    #[Route(path: '/signout', name: 'app_sign_out')]
    public function appSignOut(Request $request): JsonResponse
    {
        $session = $request->getSession();
        $session->invalidate();
        return new JsonResponse(['status' => 'Ok', 
            'message' => 'Выход из аккаунта выполнен успешно']);
    }
}
