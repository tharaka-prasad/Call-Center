<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'firstName' => 'Super',
            'lastName' => 'Admin',
            'email' => 'superadmin@example.com',
            'role' => 'superadmin',
            'companyid' => null,
            'password' => Hash::make('12345678'),
            'status' => 'active',
        ]);
    }
}
