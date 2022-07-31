#include <stdio.h>
#include <stdlib.h>
#include <GLFW/glfw3.h>
#include <GL/glew.h>
#include <glm/glm.hpp>

using namespace glm;

int main()
{
    glewExpirimental = true;

    if (!glfInit())
    {
        fprintf(stderr, "Failed to initialize GLFW\n");
        return -1;
    }
}
