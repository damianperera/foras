//
/**
 
Copyright 2018 Damian Perera

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 
MainVC.swift in foras
Created by Damian Perera on 2/14/18.

*/

import UIKit

class MainVC: UIViewController {

    let blackView = UIView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(showHostSettings),
                                               name: NSNotification.Name("ShowHostSettings"),
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(showEditorSettings),
                                               name: NSNotification.Name("ShowEditorSettings"),
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(showNetworkSettings),
                                               name: NSNotification.Name("ShowNetworkSettings"),
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(dimBackground),
                                               name: NSNotification.Name("DimBackgroundForSideMenu"),
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(resetBackground),
                                               name: NSNotification.Name("ResetBackgroundForSideMenu"),
                                               object: nil)
    }
    
    @objc func showHostSettings() {
        performSegue(withIdentifier: "ShowHostSettings", sender: nil)
    }
    
    @objc func showEditorSettings() {
        performSegue(withIdentifier: "ShowEditorSettings", sender: nil)
    }
    
    @objc func showNetworkSettings() {
        performSegue(withIdentifier: "ShowNetworkSettings", sender: nil)
    }
    
    @IBAction func onMenuTapped() {
        print("Toggle Side Menu")
        NotificationCenter.default.post(name: NSNotification.Name("ToggleSideMenu"), object: nil)
    }
    
    @objc func dimBackground() {
        print ("Dimming Background")
        blackView.backgroundColor = UIColor(white:0, alpha: 0.5)
        view.addSubview(blackView)
        blackView.frame = view.frame
        blackView.alpha = 0
        
        UIView.animate(withDuration: 0.5, animations: {
            self.blackView.alpha = 1
        })
    }
    
    @objc func resetBackground() {
        print ("Resetting Background")
        UIView.animate(withDuration: 0.5) {
            self.blackView.alpha = 0
        }
    }
    
}
