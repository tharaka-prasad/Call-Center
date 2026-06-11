<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('call_recordes', function (Blueprint $table) {
            $table->id();
            $table->string('customerName')->nullable();
            $table->string('customerPhoneNumber')->nullable();
            $table->string('customerAddress')->nullable();
            $table->string('customerEmail')->nullable();
            $table->string('customerCompany')->nullable();
            $table->integer('product')->nullable();
            $table->integer('productModel')->nullable();
            $table->decimal('productPrice', 12, 2)->default(0)->nullable();
            $table->decimal('discountPrice', 12, 2)->default(0)->nullable();
            $table->decimal('advancePrice', 12, 2)->default(0)->nullable();
            $table->integer('reason')->nullable();
            $table->integer('district')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', [
                'pending',
                'complete',
                'close',
                'fail',
            ])->default('pending')->nullable();
            $table->text('completeNote')->nullable();
            $table->dateTime('completeDate')->nullable();
            $table->integer('companyId')->nullable();
            $table->text('fail_reason')->nullable();
            $table->integer('callback_days')->nullable();
            $table->integer('createdBy')->nullable();
            $table->dateTime('callback_date')->nullable();
            $table->dateTime('closeDate')->nullable();
            $table->text('closeNote')->nullable();
            $table->text('callback_note')->nullable();
            $table->string('callback_time')->nullable();
            $table->enum('is_callback_done', ['yes', 'no'])->default('no')->nullable();
            $table->text('callback_description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('call_recordes');
    }
};
