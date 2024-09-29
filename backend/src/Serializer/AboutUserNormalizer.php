<?php

namespace App\Serializer;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use App\Entity\AboutUser;

class AboutUserNormalizer implements NormalizerInterface
{
    public function __construct(
        #[Autowire(service: 'serializer.normalizer.object')]
        private readonly NormalizerInterface $normalizer
    ) { }

    public function supportsNormalization($data,
                                          ?string $format = null,
                                          array $context = []): bool
    {
        return $data instanceof AboutUser;
    }

    public function normalize($object,
                              ?string $format = null,
                              array $context = []): array
    {
        $data = $this->normalizer->normalize($object, $format, $context);
        // достаем данные из "временного хранилища" и чистим его
        $data['image'] = $object->getImageStr();
        $data['imageStr'] = "";

        return $data;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            AboutUser::class => true,
        ];
    }
}