org 100h

jmp start

; ================= DATA =================

menu db 13,10,'==== MAIN MENU ====',13,10
     db '1. Say Hello',13,10
     db '2. Show Info',13,10
     db '3. Clear Screen',13,10
     db '4. Repeat Character',13,10
     db '5. Exit',13,10
     db 'Enter choice: $'

msg1 db 13,10,'Hello User!$'
msg2 db 13,10,'This is a simple menu system in Assembly.$'
invalid db 13,10,'Invalid choice! Try again.$'

ask_char db 13,10,'Enter a character: $'
ask_count db 13,10,'How many times (1-9): $'

newline db 13,10,'$'

; ================= CODE =================

start:

main_menu:
    call print_menu
    call get_input

    cmp al, '1'
    jne check2
    jmp option1

check2:
    cmp al, '2'
    jne check3
    jmp option2

check3:
    cmp al, '3'
    jne check4
    jmp option3

check4:
    cmp al, '4'
    jne check5
    jmp option4

check5:
    cmp al, '5'
    jne invalid_choice
    jmp exit_program

invalid_choice:
    call show_invalid
    jmp main_menu

; ================= OPTIONS =================

option1:
    mov dx, msg1
    call print_string
    call wait_key
    jmp main_menu

option2:
    mov dx, msg2
    call print_string
    call wait_key
    jmp main_menu

option3:
    call clear_screen
    jmp main_menu

option4:
    call repeat_character
    jmp main_menu

; ================= FUNCTIONS =================

print_menu:
    mov dx, menu
    call print_string
    ret

get_input:
read_again:
    mov ah, 01h
    int 21h

    cmp al, 13
    je read_again

    mov bl, al

    mov ah, 02h
    mov dl, 13
    int 21h
    mov dl, 10
    int 21h

    mov al, bl
    ret

print_string:
    mov ah, 09h
    int 21h
    ret

show_invalid:
    mov dx, invalid
    call print_string
    ret

wait_key:
    mov ah, 01h
    int 21h
    ret

clear_screen:
    mov ax, 0003h
    int 10h
    ret

repeat_character:
    mov dx, ask_char
    call print_string

    mov ah, 01h
    int 21h
    mov bl, al

    mov dx, ask_count
    call print_string

    mov ah, 01h
    int 21h
    sub al, '0'
    mov cl, al

    mov dx, newline
    call print_string

repeat_loop:
    mov ah, 02h
    mov dl, bl
    int 21h
    loop repeat_loop

    call wait_key
    ret

; ================= EXIT =================

exit_program:
    mov ah, 4Ch
    int 21h