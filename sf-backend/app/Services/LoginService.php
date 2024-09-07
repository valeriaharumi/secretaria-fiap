<?php

namespace App\Services;

use Webpatser\Uuid\Uuid;

class LoginService
{
    public static function generateToken($user)
    {
        $uid = Uuid::generate(4);
        $customClaims = ['uid' => $uid->__get("string"), 'user' => $user->id, 'role' => $user->role];
        return encrypt($customClaims);
    }
}
