#!/usr/bin/env python3
import sys

from PIL import Image
from inky.auto import auto

def convert_and_rotate(input_path):
    # Open an existing image
    img = Image.open(input_path)
    
    # Convert transparency to white if necessary
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        # Use a white background image
        alpha = img.convert('RGBA').split()[-1]
        bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
        bg.paste(img, mask=alpha)
        img = bg.convert('RGB')
    else:
        print("Image has no transparency")
        img = img.convert('RGB')
    
    # Rotate the image by 90 degrees
    rotated_img = img.rotate(90, expand=True)

    return rotated_img

    # Save the resulting image
    # rotated_img.save(output_path, "PNG")


inky = auto(ask_user=True, verbose=True)
saturation = 0.7

# if len(sys.argv) == 1:
#     print("""
# Usage: {file} image-file
# """.format(file=sys.argv[0]))
#     sys.exit(1)

# image = Image.open(sys.argv[1])
image = convert_and_rotate("test.png")
resizedimage = image.resize(inky.resolution)

# if len(sys.argv) > 2:
#     saturation = float(sys.argv[2])

inky.set_image(resizedimage, saturation=saturation)
inky.show()



# Example usage
# convert_and_rotate('test.png', 'test_rotate.png')




