import React from "react";
import Sidebar from "react-sidebar";
 
class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  render() {
    return (<div>
      <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        docked={true}
        styles={{ sidebar: {
            zIndex: 2,
            position: "absolute",
            top: 0,
            bottom: 0,
            transition: "transform .3s ease-out",
            WebkitTransition: "-webkit-transform .3s ease-out",
            willChange: "transform",
            overflowY: "auto",
            background: "white",
          } }}
      ><button onClick={() => this.onSetSidebarOpen(true)}>
      Open sidebar
    </button>
      </Sidebar>
      
              </div>
    );
  }
}
 
export default Side;