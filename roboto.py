from gpiozero import Robot
import pygame

" this line defines the gpio associated with the ac motors 
robby = Robot(left=(7,8), right=(9,10))

pygame.init()
" after initiated use pygames's joystick class to access the connected joystick
j = pygame.joystick.Joystick(0)
j.init()

try:
    while True:
        events = pygame.event.get()
        for event in events:
            if event.type == pygame.JOYBUTTONDOWN:
                print("Button Pressed")
                " if someone holds b button on xbox one controller, should start the engine
                if j.get_button(1):
                    robby.forward()
            elif event.type == pygame.JOYBUTTONUP:
                print("Button Released")
                robby.stop()

except KeyboardInterrupt:
    print("EXITING NOW")
    j.quit()