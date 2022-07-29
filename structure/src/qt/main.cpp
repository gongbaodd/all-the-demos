#include <QtGui/QGuiApplication>
#include "mainwindow.h"

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);
    MainWindow mainWindow;
    mainWindow.show();
    return app.exec();
}