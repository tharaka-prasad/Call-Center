<?php

use App\Http\Controllers\CallRecordeController;
use App\Http\Controllers\CompanyDeatailsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/call-records', [CallRecordeController::class, 'index'])
        ->name('call-records.index');

    Route::get('/call-records/create', [CallRecordeController::class, 'create'])
        ->name('call-records.create');

    Route::post('/call-records-store', [CallRecordeController::class, 'store'])
        ->name('call-records.store');

    Route::get('/call-records/{id}', [CallRecordeController::class, 'show'])
        ->name('call-records.show');

    Route::get('/call-records/{id}/edit', [CallRecordeController::class, 'edit'])
        ->name('call-records.edit');

    Route::put('/call-records/{id}', [CallRecordeController::class, 'update'])
        ->name('call-records.update');

    Route::delete('/call-records/{id}', [CallRecordeController::class, 'destroy'])
        ->name('call-records.destroy');




    Route::get('/call-records-Report', [ReportController::class, 'index'])
        ->name('report.index');





    Route::get('/company-settings', [CompanyDeatailsController::class, 'index'])
        ->name('company.index');

});

require __DIR__ . '/auth.php';
