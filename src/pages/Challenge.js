import { Link } from "react-router-dom";

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, FireIcon } from '@heroicons/react/outline'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const Practice = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyBLAN84VP3jSA5dqhrU6Bjmfu5NiUDuNw4",
    authDomain: "cyberjags-8b081.firebaseapp.com",
    databaseURL: "https://cyberjags-8b081.firebaseio.com",
    projectId: "cyberjags-8b081",
    storageBucket: "cyberjags-8b081.appspot.com",
    messagingSenderId: "166652277588",
    appId: "1:166652277588:web:e08b9e19916451e14dcec1",
    measurementId: "G-7ZNKM9VFN2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth();

  document.title = "CTFGuide - Activity"
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'Loading...',
    imageUrl: 'https://ctfguide.com/demopfp.png'
  });

  const [challenge, setChallenges] = useState({
    data: []
  })


  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }
  useEffect(() => {


    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        console.log(firebaseUser.photoURL);
        if (firebaseUser.photoURL) {
          setUser({
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            imageUrl: firebaseUser.photoURL,
          });
        } else {
          setUser({
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            imageUrl:
              "https://ui-avatars.com/api/?name=laphatize&background=random",
          });
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

          if (this.readyState === 4 & this.status === 200) {
            let data = JSON.parse(this.responseText);


          }

          if (this.readyState === 4 & this.status === 500) {
            // User not registered via API
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
              if (this.readyState === 4 & this.status === 200) {
                window.location.reload();
              }
            }
            xhttp.open("GET", `http://localhost:3001/users/register?uid=${firebaseUser.uid}`);
            xhttp.send();

          }
        }

        xhttp.open("GET", `http://localhost:3001/users/data?uid=${firebaseUser.uid}`);
        xhttp.send();

        // ChallengeName ChallengeDetails
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            // Success!
            let data = JSON.parse(this.responseText);
            document.getElementById("challengeName").innerHTML = data.title;
            document.getElementById("challengeDetails").innerHTML = data.problem;

            document.getElementById("suggestedLoader").classList.add("hidden");
          }
        }
        xhttp.open("GET", "http://localhost:3001/challenges/specific/" + window.location.href.split("/")[4]);
        xhttp.send();




      } else {
        window.location.href = "../login";
      }
    });
  }, []);


  function showTerminal() {
    document.getElementById("terminal").classList.remove("hidden");
  }
  const navigation = [
    { name: 'Dashboard', href: '../dashboard', current: false },
    { name: 'Practice', href: '../practice', current: false },
    { name: 'Classes', href: '#', current: false },
    { name: 'CTFLive', href: '#', current: false },
    { name: 'Friends', href: '#', current: false },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', onClick: logout },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  return (

    <div className="min-h-full" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      <Disclosure as="nav" className="bg-gradient-to-br from-gray-900 to-black border border-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-14 w-14"
                      src="../CTFGuide trans dark.png"
                      alt="CTFGuide"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  onClick={item.onClick}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    onClick={item.onClick}

                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user.name}</div>
                    <div className="text-sm font-medium text-gray-400">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name + "m"}
                      onClick={logout}
                      className="block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-white hover:bg-gray-700"
                    >{item.name}</a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>


      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

          <div>



            <div className="px-5 py-10 rounded-lg  bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <h1 id="challengeName" className="text-4xl text-white mb-4 font-semibold"></h1>

              <div id="suggestedLoader" className="mt-2 px-4 py-4 ">
                <div className="flex items-center justify-between">



                  <div>
                    <h1 className="text-xl">One second please...</h1>
                  </div>


                </div>
              </div>
              

                  <p id="challengeDetails" className="text-white text-xl">
                      
                    </p>

                      <input placeholder="CTFGuide{flag}" className="text-white  focus-outline-none  outline-none px-4 py-1 rounded-lg mr-2 bg-black border border-gray-700"></input>
                      <button onClick={showTerminal} className="mt-4 border bg-black border-green-500  rounded-lg  hover:bg-gray-900 text-green-500 px-4 py-1">Submit Flag</button>
                      <button onClick={showTerminal} className="mt-4 border bg-black  rounded-lg  border-yellow-300 text-yellow-300 hover:bg-gray-900 text-white px-4 py-1 ml-2">Stuck?</button>


                    <div id="terminal" className=" mt-6 ">
                  <p className="text-gray-400 mb-2 hint">Your server credentials are the same as your CTFGuide account. <a style={{ cursor: 'pointer'}} className="hover:bg-black text-gray-300">Need help?</a></p>
                    <iframe className="w-full" height="500" src="https://terminal.ctfguide.com/wetty/ssh/root?pass=" ></iframe>
                       </div>


            </div>

            <div className="mt-5   bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg px-5 py-10">
                    <h1 className="text-white text-4xl font-semibold">Comments</h1>
                    <textarea className="mt-4 text-white focus:outline-none outline-none block w-full bg-black rounded-lg"></textarea>
                    <button className="mt-4 border bg-black hover:bg-gray-900 rounded-lg text-white px-4 py-1">Post Comment</button>

              </div>

          </div>


          <div className="px-4 py-4 sm:px-0 hidden">
            <div className=" rounded-lg h-96" />



          </div>
          {/* /End replace */}
        </div>
      </main>

      <p className="mt-4 text-gray-500 py-4 text-center mx-auto">  &copy; CTFGuide 2022<br></br><a className="hover:text-white" href="../terms-of-service">Terms of Service</a> • <a className="hover:text-white" href="../privacy-policy">Privacy Policy</a> • <a className="hover:text-white" href="../ambassador-program">Ambassador Program</a><br></br>This is beta software. Problems will arise.</p>

    </div>

  )
}


export default Practice;