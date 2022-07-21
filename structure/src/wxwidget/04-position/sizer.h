#ifndef __SIZER_H__
#define __SIZER_H__

#include <wx/wx.h>

class Sizer : public wxFrame
{
public:
    Sizer(const wxString &title);

    wxMenuBar *menuBar;
    wxMenu *file;
    wxMenu *edit;
    wxMenu *help;
    wxTextCtrl *textctrl;
};

#endif