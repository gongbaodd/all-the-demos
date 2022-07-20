#ifndef __COMMUNICATE_H__
#define __COMMUNICATE_H__

#include "panels.h"
#include <wx/wxprec.h>

class Communicate : public wxFrame
{
public:
    Communicate(const wxString &);

    LeftPanel *m_lp;
    RightPanel *m_rp;
    wxPanel *m_parent;
};

#endif