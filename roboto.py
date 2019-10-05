from gpiozero import Robot
import pygame

robby = Robot(left=(7,8), right=(10,9))


pygame.init()

j = pygame.joystick.Joystick(0)
j.init()

try:
    while True:
        events = pygame.event.get()
        for event in events:
            if event.type == pygame.JOYAXISMOTION:
                if j.get_axis(0) < 0:
                    robby.forward()
                    robby.left()
                    if j.get_button(0):
                        robby.forward()
                elif j.get_axis(0) > 0:
                    robby.forward()
                    robby.right()
                    if j.get_button(0):
                        robby.forward()
                elif j.get_axis(0) == 0:
                    if not j.get_button(0):
                        robby.stop()
                
                    
            if event.type == pygame.JOYBUTTONDOWN:
                print("Button Pressed")
                
                    
                if j.get_button(0):
                    robby.forward()
                    
                if j.get_button(4):
                    robby.backward()
               
            elif event.type == pygame.JOYBUTTONUP:
                print("Button Released")
                robby.stop()

except KeyboardInterrupt:
    print("EXITING NOW")
    j.quit()
