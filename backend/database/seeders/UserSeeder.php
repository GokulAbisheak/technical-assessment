<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 random users
        User::factory(10)->create();

        // Create a specific test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone_number' => '0771234567',
            'address' => '123 Example Street, Testville',
            'age' => 30,
            'profile_picture' => '',
        ]);
    }
}
