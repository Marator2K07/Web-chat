<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

class RecoveryController extends AbstractController
{
    #[Route('/recovery/start', name: 'app_recovery_start', methods: "POST")]
    public function startRecovery(): JsonResponse
    {
        return new JsonResponse([
            'status' => 'Ok',
            'test' => 'PESWRD'
        ]);
    }
}
