#include <iostream>
#include <boost/shared_ptr.hpp>
#include <boost/filesystem.hpp>

int main(int argc, char *argv[])
{
    std::cout << "Hello Third Party Include!" << std::endl;

    boost::shared_ptr<int> isp(new int(4));

    boost::filesystem::path path = "/usr/share/cmake/modules";

    if (path.is_relative())
    {
        std::cout << "path is relative" << std::endl;
    }
    else
    {
        std::cout << "path is not relative" << std::endl;
    }
}