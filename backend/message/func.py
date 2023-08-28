def define_file_type(file_name):
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    video_extensions = ['.mp4', '.avi', '.mkv', '.mov']

    if not file_name:
        return 'Text'

    for iext in image_extensions:
        if file_name.endswith(iext):
            return 'Image'
    else:
        for vext in video_extensions:
            if file_name.endswith(vext):
                return 'Video'
            else:
                return 'File'





